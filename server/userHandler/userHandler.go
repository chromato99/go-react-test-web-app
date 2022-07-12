package userHandler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type loginData struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type user struct {
	Username string
	Password string
	Email    string
}

var sampleUser = user{
	Username: "test",
	Password: "123456",
	Email:    "test123123@gmail.com",
}

func User(c *gin.Context) {
	user := checkLogin(c)

	if user != nil {
		c.JSON(http.StatusOK, gin.H{
			"username": sampleUser.Username,
			"email":    sampleUser.Email,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"username": "Not Login",
			"email":    "",
		})
	}

}

func Login(c *gin.Context) {
	var inputLoginData loginData

	if err := c.ShouldBindJSON(&inputLoginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if inputLoginData.Username != sampleUser.Username || inputLoginData.Password != sampleUser.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
		return
	}

	user := checkLogin(c)

	if user == nil {
		c.SetCookie("userId", sampleUser.Username, 3600, "/", "localhost", false, true)
		c.JSON(http.StatusOK, gin.H{"status": "you are logged in"})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "you are already logged in"})
	}
}

func Logout(c *gin.Context) {
	c.SetCookie("userId", "", -1, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"status": "you are logged out"})
}

func checkLogin(c *gin.Context) *string {
	cookie, err := c.Cookie("userId")

	if err != nil {
		return nil
	} else {
		return &cookie
	}
}
