> # API DOCS HOTEL-MANAGEMENT

### 1.Authentication APIs

------------


> ##### 1./api/auth/admin-login -POST
###### input
```json
{
    email
}
```
output
```json
{
    token,adminData
}
```
------------


> ##### 2./api/auth/logout - POST
###### input
```json
{}
```
output
```json
{
    Logout Message
}
```
------------
>##### 3./api/auth/shop-signup -POST
###### input
```json
{
name,email,password,latitude,longitude,phone,password,confirmPassword
}
```
output
```json
{
   SIgnup Success Message
}
```
------------
>##### 4./api/auth/shop-login -POST
###### input
```json
{
email,password
}
```
output
```json
{
token,shopData
}
```
------------
###2.Product APIs
>#####1./api/products/create-product -POST
###### input
```json
{
name,description,price,category,image,quantity,shop
}
```
output
```json
{
productData
}
```
------------
>#####2./api/products/list-product/:id
###### input
```json
{
shop : id
}
```
output
```json
{
productData[]
}
```
------------

>#####3./api/products/delete-product/:id
###### input
```json
{
id
}
```
output
```json
{
Deleted Message
}
```
------------
