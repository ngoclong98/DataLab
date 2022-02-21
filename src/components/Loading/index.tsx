import "./Loading.module.scss";
interface LoadingProps {
  containerClassName?: string;
}

const Loading = ({ containerClassName }: LoadingProps) => {
  return (
    <div className={containerClassName || "columnCenter mt56"}>
      <div className="loadingSmall-spinner-rolling">
        <div className="loadingSmall">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
