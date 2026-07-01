from pathlib import Path
import json
import urllib.request
import urllib.error

p = Path('.env.local')
if not p.exists():
    raise SystemExit('.env.local not found')
lines = [l.strip() for l in p.read_text().splitlines() if l.strip() and not l.strip().startswith('#')]
env = dict(l.split('=',1) for l in lines)
if 'NEXT_PUBLIC_FIREBASE_API_KEY' not in env:
    raise SystemExit('missing API key')

api_key = env['NEXT_PUBLIC_FIREBASE_API_KEY']
email = 'auth-debug-reset@example.com'
continue_url = env.get('NEXT_PUBLIC_SITE_URL','https://theodundesign.com') + '/login'
payload = {
    'requestType': 'PASSWORD_RESET',
    'email': email,
    'continueUrl': continue_url,
    'canHandleCodeInApp': False,
}
url = f'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={api_key}'
print('URL', url)
print('Payload', json.dumps(payload, indent=2))
req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as r:
        print('status', r.status)
        print(json.dumps(json.load(r), indent=2))
except urllib.error.HTTPError as e:
    body = e.read().decode('utf-8')
    print('status', e.code)
    print(body)
