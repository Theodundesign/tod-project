from pathlib import Path
import json
import time
import urllib.request
import urllib.error

p = Path('.env.local')
if not p.exists():
    raise SystemExit('.env.local not found')
lines = [l.strip() for l in p.read_text().splitlines() if l.strip() and not l.strip().startswith('#')]
env = dict(l.split('=',1) for l in lines)
api_key = env.get('NEXT_PUBLIC_FIREBASE_API_KEY')
if not api_key:
    raise SystemExit('missing NEXT_PUBLIC_FIREBASE_API_KEY')
continue_url = env.get('NEXT_PUBLIC_SITE_URL','https://theodundesign.com') + '/login'

unique = int(time.time() * 1000)
email = f'todreset{unique}@web-library.net'
password = 'ResetTest123!'
print('Using test email:', email)

# Create mail.tm account
account_data = json.dumps({'address': email, 'password': password}).encode('utf-8')
req = urllib.request.Request('https://api.mail.tm/accounts', data=account_data, headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as r:
        account_resp = json.load(r)
        print('Mail.tm account created:', account_resp.get('id'))
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8')
    print('Mail.tm account creation failed:', e.code, body)
    raise

# Authenticate
auth_data = json.dumps({'address': email, 'password': password}).encode('utf-8')
req = urllib.request.Request('https://api.mail.tm/token', data=auth_data, headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req) as r:
    token_resp = json.load(r)
    token = token_resp['token']
    print('Mail.tm auth token acquired')

# Send password reset request
payload = {
    'requestType': 'PASSWORD_RESET',
    'email': email,
    'continueUrl': continue_url,
    'canHandleCodeInApp': False,
}
url = f'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={api_key}'
req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
print('Sending password reset request...')
with urllib.request.urlopen(req) as r:
    resp = json.load(r)
    print('Firebase response:', resp)

# Poll inbox
headers = {'Authorization': f'Bearer {token}', 'Accept': 'application/json'}
for attempt in range(15):
    time.sleep(5)
    list_req = urllib.request.Request('https://api.mail.tm/messages', headers=headers)
    with urllib.request.urlopen(list_req) as r:
        msgs = json.load(r)
    if isinstance(msgs, dict) and msgs.get('hydra:member'):
        message = msgs['hydra:member'][0]
    elif isinstance(msgs, list) and msgs:
        message = msgs[0]
    else:
        message = None
    if message:
        print('Message found:', message.get('subject'))
        msg_req = urllib.request.Request(f"https://api.mail.tm/messages/{message['id']}", headers=headers)
        with urllib.request.urlopen(msg_req) as r:
            msg_data = json.load(r)
        print('From:', msg_data.get('from'))
        print('Subject:', msg_data.get('subject'))
        print('Text:', msg_data.get('text'))
        print('HTML snippet:', msg_data.get('html')[:300] if msg_data.get('html') else '')
        raise SystemExit(0)
    print('No message yet, retrying...', attempt + 1)

print('No reset email arrived within 75 seconds.')
raise SystemExit(2)
