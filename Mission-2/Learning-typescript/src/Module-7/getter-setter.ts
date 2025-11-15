{
  class BankAccount {
    public readonly accId: number;
    public accName: string;
    private accBalance: number;

    constructor(accId: number, accName: string, accBalance: number) {
      this.accId = accId;
      this.accName = accName;
      this.accBalance = accBalance;
    }

    set depositBalance(numOfAmount: number) {
      this.accBalance += numOfAmount;
    }

    get checkBalance() {
      return this.accBalance;
    }
  }

  const bayezidsAcc = new BankAccount(555, "Kamruzzaman", 200);
  console.log(bayezidsAcc.checkBalance);
  bayezidsAcc.depositBalance = 500;
  console.log(bayezidsAcc.checkBalance);
}
