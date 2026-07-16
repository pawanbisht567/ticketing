Remember the skaffold setup

C:\Windows\System32\drivers\etc
```
commands
1. skaffold dev


If you see the browser cannot visit the ticketing.dev then follow below steps
```
1. Go the ticketing.dev/api/user/currentuser
2. Type "thisisunsafe", just randomly type this in the browser tab, not in the URL.
3. You will see the ingress-output
```

How to connect to mongo-db
```
1. kubectl port-forward service/auth-mongo-svc 27017:27017
```

type this on browser like Chrome and Brave
'thisisunsafe'

APIs
POST ticketing.dev/api/users/signup