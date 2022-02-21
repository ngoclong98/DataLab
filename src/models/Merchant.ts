export default interface Merchant {
  id: string;
  createdTime: string;
  code: string;
  name: string;
  activeStatus: string;
  useInstantPayment: boolean;
  useAutoDebit: boolean;
}
