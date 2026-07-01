from pathlib import Path
import json
import urllib.request
import urllib.error
import time

p = Path('.env.local')
if not p.exists():
    raise SystemExit('.env.local not found')
lines = [l.strip() for l in p.read_text().splitlines() if l.strip() and not l.strip().startswith('#')]
env = dict(l.split('=',1) for l in lines)
if not env.get('NEXT_PUBLIC_FIREBASE_API_KEY'):
    raise SystemExit('missing API key')
api_key = env['NEXT_PUBLIC_FIREBASE_API_KEY']
email = f'test-reset-{int(time.time()*1000)}@example.com'
password = 'Test1234!'
print('email', email)
for name, url, payload in [
    ('SIGNUP', f'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={api_key}', {'email': email, 'password': password, 'returnSecureToken': True}),
    ('RESET', f'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key={api_key}', {'requestType': 'PASSWORD_RESET', 'email': email})
]:
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as r:
            print(name, r.status, json.load(r))
    except urllib.error.HTTPError as e:
        print(name, e.code, e.read().decode('utf-8'))
