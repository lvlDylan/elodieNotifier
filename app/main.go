package main

import (
	"encoding/json"
	"log"
	"net/url"
	"os/exec"

	"github.com/gorilla/websocket"
)

type Notification struct {
	Title string `json:"title"`
	Msg   string `json:"message"`
}

const wsURL = "wss://elodie.dylanlv.dev/ws/"

func notifySend(title string, message string) {
	appName := "Bibus Notifications"
	imagePath := "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
	cmd := exec.Command("notify-send", "-a", appName, "-i", imagePath, title, message)

	if err := cmd.Run(); err != nil {
		log.Printf("Error sending notification: %v", err)
	}
}

func main() {
	u, err := url.Parse(wsURL)
	if err != nil {
		log.Fatal("URL invalid : %v", err)
	}

	log.Printf("Connecting to %s", u.String())
	conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatalf("Error connecting to %s: %v", u.String(), err)
	}
	defer conn.Close()

	log.Println("Connected to websocket server")

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading from websocket:", err)
			return
		}

		if mt == websocket.TextMessage {
			log.Printf("Raw message received: %s", message)
			var notif Notification
			err := json.Unmarshal(message, &notif)
			if err != nil {
				log.Printf("Error unmarshalling notification: %v", err)
				continue
			}

			displayTitle := notif.Title
			if displayTitle == "" {
				displayTitle = "Notifications de Bibus"
			}

			notifySend(displayTitle, notif.Msg)
		}
	}
}
