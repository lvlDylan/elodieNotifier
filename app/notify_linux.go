//go:build linux || darwin

package main

import (
	"log"
	"os/exec"
)

func notifySend(title string, message string, iconPath string) {
	appName := "Bibus Notifications" // Le nom pour Linux

	args := []string{"-a", appName}

	if iconPath != "" {
		args = append(args, "-i", iconPath)
	} else {
		args = append(args, "-i", "dialog-information")
	}

	args = append(args, title, message)

	cmd := exec.Command("notify-send", args...)

	if err := cmd.Run(); err != nil {
		log.Printf("Erreur notif Linux: %v", err)
	}
}
