document.getElementsByTagName("button")[0].addEventListener("click", () => {
    // document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "jwt=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.location.href = "/"
})