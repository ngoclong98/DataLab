import Switch from "react-switch";
interface SwitchListTileProps {
  checked: boolean;
  onChange: (boolean) => void;
  text: string;
}
const SwitchListTile = ({ checked, onChange, text }: SwitchListTileProps) => {
  const _handleChange = (checked, event) => {
    if (onChange) {
      onChange(checked);
    }
  };

  const _handleClickRow = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="rowStart" onClick={_handleClickRow}>
      <div className="rowStart mr8">
        <Switch
          checked={checked}
          onChange={_handleChange}
          checkedIcon={false}
          uncheckedIcon={false}
          color={"#f54a00"}
          onColor={"#f54a00"}
          offColor={"#FECB98"}
          width={36}
          height={20}
        />
      </div>
      <div className="body13 textBlack">{text}</div>
    </div>
  );
};
export default SwitchListTile;
