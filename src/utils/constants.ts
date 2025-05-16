export const reminderOptions = {
    title: '=== Rappelle-moi ===',
    sendReminderOption: '1. Envoyer un rappelle-moi',
    helpOption: '2. Aide',
    invalidOption: 'Choix invalide. Veuillez entrer un numéro valide.',
    phoneNumberPrompt: 'Entrez le numéro de téléphone du destinataire : ',
    helpMessage:
        'Bienvenue ! Pour utiliser le service "Rappelle-moi", composez #555*Numéro Yas Mobile#.\n' +
        'Pour le SOS crédit, composez #555*Numéro Yas Mobile*montant demandé#.',
    enterChoice: 'Entrez votre choix : ',
    reminderSent: 'Demande de rappel envoyée au ',
    timeoutMessage: 'Temps écoulé. Fermeture automatique.'
} as const;

export const mvoLaOptions = {
    title: "=== Rappelle-moi ===",
    options: [
        "1. dépôt",
        "2. retrait",
        "3. consulter solde",
        "4. transfert",
    ],
    helpOption: "5. Aide",
    phoneNumberPrompt: "Entrez le numéro de téléphone du destinataire : ",
    enterChoice: "Entrez votre choix : ",
    invalidOption: "Choix invalide. Veuillez entrer un numéro valide.",
    timeoutMessage: "Temps écoulé. Fermeture automatique.",
    helpMessage:
        'Bienvenue ! Pour utiliser le service, composez le numéro approprié.\n' +
        'Pour toute assistance, contactez le support.',
} as const;