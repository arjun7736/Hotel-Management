api Docs

1.Authentication APIs
1./api/auth/admin-login
{
    input:{email},
    output:{token,adminData}
}
2./api/auth/logout
{
    output:{logout message}
}
3./api/auth/shop-signup
{
    input:{name,email,password,latitude,longitude,phone,password,confirmPassword},
    output:{token,shopData}
 
}
4./api/auth/shop-login
{
    input:{email,password},
    output:{token,shopData}
}

2.Product APIs
1./api/products/create-product
{
    input:{name,description,price,category,image,quantity,shop},
    output:{productData}
}
2./api/products/list-product/:id
{
    input:{id},
    output:{productData[]}
}
3./api/products/delete-product/:id
{
    input:{id},
    output:{deleted message}
}