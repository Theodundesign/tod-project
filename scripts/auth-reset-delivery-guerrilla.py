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

# Get Guerrilla Mail address
req = urllib.request.Request('https://api.guerrillamail.com/ajax.php?f=get_email_address', headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'})
with urllib.request.urlopen(req) as r:
    addr_resp = json.load(r)
    email = addr_resp['email_addr']
    sid_token = addr_resp['sid_token']
    print('Using Guerrilla Mail email:', email)

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
base = 'https://api.guerrillamail.com/ajax.php'
for attempt in range(30):
    time.sleep(5)
    list_url = f"{base}?f=get_email_list&offset=0&sid_token={sid_token}"
    list_req = urllib.request.Request(list_url, headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'})
    with urllib.request.urlopen(list_req) as r:
        msgs = json.load(r)
    if msgs.get('list'):
        for message in msgs['list']:
            subject = message.get('mail_subject', '').lower()
            sender = message.get('mail_from', '').lower()
            if 'welcome' in subject or 'guerrilla' in subject:
                continue
            if 'password' in subject or 'reset' in subject or 'firebase' in sender:
                print('Reset email candidate found:', message)
                fetch_url = f"{base}?f=fetch_email&email_id={message['mail_id']}&sid_token={sid_token}"
                fetch_req = urllib.request.Request(fetch_url, headers={'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json'})
                with urllib.request.urlopen(fetch_req) as r:
                    msg_data = json.load(r)
                print('From:', msg_data.get('mail_from'))
                print('Subject:', msg_data.get('mail_subject'))
                print('Body excerpt:', msg_data.get('mail_body', '')[:1000])
                raise SystemExit(0)
    print('No reset email yet, retrying...', attempt + 1)

print('No reset email arrived to Guerrilla Mail within 100 seconds.')
raise SystemExit(2)
