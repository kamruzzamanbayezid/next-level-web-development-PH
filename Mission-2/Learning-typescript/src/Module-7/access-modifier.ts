class BankAccount {
  public readonly accId: number;
  public accName: string;
  private accBalance: number;

  constructor(accId: number, accName: string, accBalance: number) {
    this.accId = accId;
    this.accName = accName;
    this.accBalance = accBalance;
  }

  getBalance() {
    return this.accBalance;
  }

  depositBalance(numOfAmount: number) {
    return (this.accBalance = this.accBalance + numOfAmount);
  }
}

const bayezidsAcc = new BankAccount(4452, "Bayezid", 200);
console.log(bayezidsAcc.getBalance());
bayezidsAcc.depositBalance(20);
console.log(bayezidsAcc.getBalance());
