import readline from "readline";
import ReminderMe from "./models/reminder_me";
import Mvola from "./models/m_vola";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function startMainMenu(): void {
    console.clear();
    console.log("=== Menu Principal ===");
    console.log("1. Rappelle-moi");
    console.log("2. Mvole");
    console.log("3. Quitter");

    rl.question("Entrez votre choix : ", (choice) => {
        switch (choice.trim()) {
            case "1":
                rl.close();
                new ReminderMe().start();
                break;
            case "2":
                rl.close();
                new Mvola().start();
                break;
            default:
                console.log("Au revoir !");
                rl.close();
                process.exit(0);
        }
    });
}

startMainMenu();
