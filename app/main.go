package main

import (
	"encoding/base64"
	"encoding/json"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/gorilla/websocket"
)

type Notification struct {
	Title string `json:"title"`
	Msg   string `json:"message"`
	Image string `json:"image"`
}

const wssURL = "wss://elodie.dylanlv.dev/ws/"
const wsURL = "ws://localhost:3001"

func saveImageToTemp(base64String string) (string, error) {
	parts := strings.Split(base64String, ",")
	if len(parts) != 2 {
		if len(parts) == 1 && len(base64String) > 10 {
		} else {
			return "", nil
		}
	}

	dataStr := parts[len(parts)-1]

	dec, err := base64.StdEncoding.DecodeString(dataStr)
	if err != nil {
		return "", err
	}

	tmpFile, err := os.CreateTemp("", "bibus-*.png")
	if err != nil {
		return "", err
	}
	defer tmpFile.Close()

	if _, err := tmpFile.Write(dec); err != nil {
		return "", err
	}

	return tmpFile.Name(), nil
}

func main() {
	u, err := url.Parse(wssURL)
	if err != nil {
		log.Fatal("URL invalid : ", err)
	}

	log.Printf("Connecting to %s", u.String())
	conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatalf("Error connecting to %s: %v", u.String(), err)
	}
	defer func(conn *websocket.Conn) {
		err := conn.Close()
		if err != nil {
			log.Printf("Error closing websocket: %v", err)
		}
	}(conn)

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

			var currentIconPath string
			if notif.Image != "" {
				path, err := saveImageToTemp(notif.Image)
				if err != nil {
					log.Printf("Failed to save image: %v", err)
				} else {
					currentIconPath = path
				}
			}

			notifySend(displayTitle, notif.Msg, currentIconPath)
		}
	}
}
