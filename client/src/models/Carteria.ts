class Carteira {
  _id: string;
  sources: Object[];

  constructor(response: any) {
    this._id = response._id;
    this.sources = response.sources;
  }

  getAmount() {
    let amount = 0;
    if (this.sources) {
      this.sources.forEach((source: any) => {
        amount += Number(source.balance);
      });
    }
    return amount;
  }

  debit(source_type: any, amount: any) {
    this.sources.forEach((source: any) => {
      if (source.type === source_type) {
        source.balance -= amount;
      }
    });

    return this;
  }

  credit(source_type: any, amount: any) {
    this.sources.forEach((source: any) => {
      if (source.type === source_type) {
        source.balance += amount;
      }
    });

    return this;
  }
}

export default Carteira;
