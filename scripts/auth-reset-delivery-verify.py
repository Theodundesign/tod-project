from pathlib import Path
import json
import time
import urllib.request
import urllib.error

# Load env
p = Path('.env.local')
if not p.exists():
    raise SystemExit('.env.local not found')
lines = [l.strip() for l in p.read_text().splitlines() if l.strip() and not l.strip().startswith('#')]
env = dict(l.split('=',1) for l in lines)
api_key = env.get('NEXT_PUBLIC_FIREBASE_API_KEY')
if not api_key:
    raise SystemExit('missing NEXT_PUBLIC_FIREBASE_API_KEY')
continue_url = env.get('NEXT_PUBLIC_SITE_URL','https://theodundesign.com') + '/login'

# Create a public 1secmail inbox
unique = int(time.time() * 1000)
login = f'todreset{unique}'
domain = '1secmail.com'
email = f'{login}@{domain}'
print('Using test email:', email)

# Send password reset request via REST
payload = {
    'requestType': 'PASSWORD_RESET',
    'email': email,
    'continueUrl': continue_url,
    'canHandleCodeInApp': False,
}
url = f'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={api_key}'
req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
print('Sending password reset request...')
try:
    with urllib.request.urlopen(req) as r:
        resp = json.load(r)
        print('Response:', resp)
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8')
    print('HTTP Error:', e.code)
    print(body)
    raise SystemExit(1)

# Poll inbox for the message
base = 'https://www.1secmail.com/api/v1/'
for attempt in range(12):
    time.sleep(5)
    check_url = f"{base}?action=getMessages&login={login}&domain={domain}"
    with urllib.request.urlopen(check_url) as r:
        msgs = json.load(r)
    if msgs:
        print('Messages found:', msgs)
        msg_id = msgs[0]['id']
        with urllib.request.urlopen(f"{base}?action=readMessage&login={login}&domain={domain}&id={msg_id}") as r:
            message = json.load(r)
        print('Message subject:', message.get('subject'))
        print('From:', message.get('from'))
        print('Body preview:', message.get('body').strip()[:300])
        raise SystemExit(0)
    print('No message yet, retrying...', attempt + 1)
print('No email arrived in test inbox within 60 seconds.')
raise SystemExit(2)
