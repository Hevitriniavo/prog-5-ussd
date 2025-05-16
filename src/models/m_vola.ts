import readline from "readline";
import { mvoLaOptions } from "../utils/constants";
import MVolaMenuOption from "../enums/m_vola_menu_option";

class Mvola {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    private timeoutId?: NodeJS.Timeout;

    start(): void {
        this.showMenu();
        this.promptWithTimeout(mvoLaOptions.enterChoice, 5000)
            .then((choice) => { this.handleChoice(choice); })
            .catch(() => { this.exitOnTimeout(); });
    }

    private showMenu(): void {
        console.clear();
        console.log(mvoLaOptions.title);
        mvoLaOptions.options.forEach((option) => {
            console.log(option);
        });
        console.log(mvoLaOptions.helpOption);
    }

    private handleChoice(choice: string): void {
        const trimmed = choice.trim();
        const choiceEnum = trimmed as MVolaMenuOption;

        switch (choiceEnum) {
            case MVolaMenuOption.Depot:
                this.askPhoneNumber("dépôt");
                break;
            case MVolaMenuOption.Retrait:
                this.askPhoneNumber("retrait");
                break;
            case MVolaMenuOption.ConsulterSolde:
                this.consulterSolde();
                break;
            case MVolaMenuOption.Transfert:
                this.askPhoneNumber("transfert");
                break;
            case MVolaMenuOption.Aide:
                this.displayHelp();
                this.closeApp();
                break;
            default:
                console.log(mvoLaOptions.invalidOption);
                this.closeApp();
                break;
        }
    }

    private askPhoneNumber(action: string): void {
        this.promptWithTimeout(mvoLaOptions.phoneNumberPrompt, 5000)
            .then((number) => {
                const trimmed = number.trim();
                if (trimmed.length > 0) {
                    console.log(`Demande de ${action} envoyée au ${trimmed}.`);
                } else {
                    console.log("Aucun numéro saisi.");
                }
                this.closeApp();
            })
            .catch(() => { this.exitOnTimeout(); });
    }

    private consulterSolde(): void {
        console.log("Votre solde actuel est : 100 000 MGA (exemple).");
        this.closeApp();
    }

    private displayHelp(): void {
        console.log(mvoLaOptions.helpMessage);
    }

    private promptWithTimeout(question: string, timeoutMs: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const onData = () => {
                this.resetTimeout(timeoutMs, reject);
            };

            this.resetTimeout(timeoutMs, reject);

            this.rl.question(question, (answer) => {
                this.clearTimeout();
                process.stdin.off("data", onData);
                resolve(answer);
            });

            process.stdin.on("data", onData);
        });
    }

    private resetTimeout(timeoutMs: number, reject: () => void): void {
        this.clearTimeout();
        this.timeoutId = setTimeout(() => {
            reject();
        }, timeoutMs);
    }

    private clearTimeout(): void {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }

    private exitOnTimeout(): void {
        console.log("\n" + mvoLaOptions.timeoutMessage);
        this.closeApp();
    }

    private closeApp(): void {
        this.clearTimeout();
        this.rl.close();
        process.exit(0);
    }
}

export default Mvola;
