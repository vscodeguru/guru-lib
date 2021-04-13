export interface ITheme {
  sidebar: { [key: string]: IStyle };
  header: { [key: string]: IStyle };
  footer: { [key: string]: IStyle };
}

export interface IStyle {
  desc: string;
  default: string;
  ctrlType?: 'color' | 'text' | 'option';
  options?: IOptionControl[];
}
export interface IOptionControl {
  text: string;
  value: string;
}
