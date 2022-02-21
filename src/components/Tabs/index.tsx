import styles from "./Tabs.module.scss";
interface TabsProps {
  data: string[];
  selectedTabIndex: number;
  onChangeTab: (index: number) => void;
}

const Tabs = ({ data, selectedTabIndex, onChangeTab }: TabsProps) => {
  const handleChangeIndex = (index: number) => {
    onChangeTab(index);
  };

  return (
    <div className={`mb14 ${styles.tabBar}`}>
      {data.map((item, index) => (
        // <div className="flex1" key={item + index}>
        <div
          onClick={() => handleChangeIndex(index)}
          style={
            index === 0
              ? { flex: 5.5 }
              : index === 1
              ? { flex: 4.5 }
              : {
                  flex: 4,
                }
          }
          className={`${
            index === selectedTabIndex
              ? styles.selectedTab
              : styles.unselectedTab
          }`}
        >
          {item}
        </div>
        // </div>
      ))}
    </div>
  );
};

export default Tabs;
