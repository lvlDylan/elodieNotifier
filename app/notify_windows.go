//go:build windows

package main

import (
	"log"

	"github.com/gen2brain/beeep"
)

func notifySend(title string, message string, iconPath string) {
	err := beeep.Notify(title, message, iconPath)

	if err != nil {
		log.Printf("Erreur technique Beeep: %v", err)
		beeep.Alert(title, message, "")
	} else {
		log.Println("Notification envoyée au système via Beeep.")
	}
}
