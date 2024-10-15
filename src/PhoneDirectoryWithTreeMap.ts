export class PhoneDirectoryWithTreeMap {
  private data: Map<string, string>;

  constructor() {
    this.data = new Map<string, string>();
  }

  getNumber(name: string): string | undefined {
    return this.data.get(name);
  }

  putNumber(name: string, number: string): void {
    if (name === null || number === null) {
      throw new Error("name and number cannot be null");
    }
    this.data.set(name, number);
  }

  print(): string[] {
    return Array.from(this.data.entries()).map(([name, number]) => `${name}: ${number}`);
  }

  getEntries(): [string, string][] {
    return Array.from(this.data.entries());
  }
}