import readline from "readline";
import {reminderOptions} from "../utils/constants";
import MenuOption from "../enums/reminder_menu_option";

class ReminderMe {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    private timeoutId?: NodeJS.Timeout;

    start(): void {
        this.showMenu();
        this.promptWithTimeout(reminderOptions.enterChoice, 5000)
            .then(choice => { this.handleChoice(choice); })
            .catch(() => { this.exitOnTimeout(); });
    }

    private showMenu(): void {
        console.clear();
        console.log(reminderOptions.title);
        console.log(reminderOptions.sendReminderOption);
        console.log(reminderOptions.helpOption);
    }

    private handleChoice(choice: string): void {
        const trimmed = choice.trim() as MenuOption;

        switch (trimmed) {
            case MenuOption.SendReminder: {
                this.askPhoneNumber();
                break;
            }
            case MenuOption.Help: {
                this.displayHelp();
                this.closeApp();
                break;
            }
            default: {
                console.log(reminderOptions.invalidOption);
                this.closeApp();
            }
        }
    }

    private askPhoneNumber(): void {
        this.promptWithTimeout(reminderOptions.phoneNumberPrompt, 5000)
            .then(number => {
                const trimmed = number.trim();
                if (trimmed.length > 0) {
                    console.log(reminderOptions.reminderSent + trimmed + '.');
                } else {
                    console.log('Aucun numéro saisi.');
                }
                this.closeApp();
            })
            .catch(() => { this.exitOnTimeout(); });
    }

    private displayHelp(): void {
        console.log(reminderOptions.helpMessage);
    }

    private promptWithTimeout(question: string, timeoutMs: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const onData = () => {
                this.resetTimeout(timeoutMs, reject);
            };

            this.resetTimeout(timeoutMs, reject);

            this.rl.question(question, answer => {
                this.clearTimeout();
                process.stdin.off('data', onData);
                resolve(answer);
            });

            process.stdin.on('data', onData);
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
        console.log('\n' + reminderOptions.timeoutMessage);
        this.closeApp();
    }

    private closeApp(): void {
        this.clearTimeout();
        this.rl.close();
        process.exit(0);
    }
}

export default ReminderMe;