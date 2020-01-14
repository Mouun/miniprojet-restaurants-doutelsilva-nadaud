backJS
### Base url `http://filipedoutelsilva.com:8989/api`


### `/creationcompte`
Accepts: **POST**
```json
{
	"username": "fifou",
	"mdp": "coucou"
}
```

Returns :
 ```json
 {
   "code": 200,
   "message": "User added",
   "payload": {
     "username": "triskae5",
     "mdp": "$2b$12$3NxkTH7DSyahH4GBuJJwquuF/DkWc9LyT0jaACVbHbReMn4M3K.Eu",
     "_id": "5e1b4d485c20795f72131621"
   }
 }
 ```

### `/connection`
Accepts: **POST**
```json
{
	"username": "fifou",
	"mdp": "coucou"
}
```

Returns :
 ```json
 {
   "code": 200,
   "message": "Logged in !",
   "payload": {
     "_id": "5e1b4fd20ca37a5fd5a3dfb2",
     "username": "fifou",
     "mdp": "$2b$12$MXwbfjwn46sMewUEzLFtbuoBXW44RU9rS0EyxqFWHhveaRtMr0MHW"
   }
 }
 ```

### `/restaurants/count`
Accepts: **GET** 
Params: `/restaurants/count?name=restoU`

Returns :
 ```json
{
  "code": 200,
  "message": null,
  "payload": 50
}
 ```

### `/restaurants/count`
Accepts: **GET** 
Params: 
- `/restaurants/count?name=restoU`
- `/restaurants/count?page=1`
- `/restaurants/count?pagesize=10`

Returns :
 ```json
{
  "code": 200,
  "message": null,
  "payload": [restaurants]
}
 ```

### `/nourriture/menus`
_menu getAll_
Accepts: **GET** 

Returns :
 ```json
{
  "code": 200,
  "message": nbDocs,
  "payload": [menu]
}
 ```

### `/nourriture/menus`
_Pour une recherche avec un seul id, un tableau form data avec un seul id_
Accepts: **POST** 
Params (formdata): 
- ids[]: id
...
...
...

Returns :
 ```json
{
  "code": 200,
  "message": nbDocs,
  "payload": [menu]
}
 ```
