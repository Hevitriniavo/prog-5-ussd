import promptSync from 'prompt-sync';

const prompt = promptSync();

function showMenu(): void {
    console.clear();
    console.log("=== YAS and ME ===");
    console.log("1. MVOLA");
    console.log("2. Call me back");
    console.log("3. SOS Credit");
    console.log("4. YAS Services");
    console.log("5. Promotions");
    console.log("6. Products and Entertainment");
    console.log("7. Banks and Micro-Finances");
    console.log("0. Next page");
}

function handleChoice(choice: string): void {
    switch (choice) {
        case "1":
            console.log("You selected: MVOLA");
            break;
        case "2":
            console.log("You selected: Call me back");
            break;
        case "3":
            console.log("You selected: SOS Credit");
            break;
        case "4":
            console.log("You selected: YAS Services");
            break;
        case "5":
            console.log("You selected: Promotions");
            break;
        case "6":
            console.log("You selected: Products and Entertainment");
            break;
        case "7":
            console.log("You selected: Banks and Micro-Finances");
            break;
        case "0":
            console.log("Navigating to next page...");
            break;
        default:
            console.log("Invalid choice. Please try again.");
            break;
    }
}

function main(): void {
    showMenu();
    const choice = prompt("Enter your choice: ");
    handleChoice(choice);
}

main();
