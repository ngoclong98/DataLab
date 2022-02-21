interface CarouselIndicatorProps {
  length?: number;
  activeIndex?: number;
}
const CarouselIndicator = ({ activeIndex, length }: CarouselIndicatorProps) => {
  if (!length) return <div />;
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    const isActive = i === activeIndex;
    const isLast = i === length - 1;
    dots.push(
      <div
        key={i}
        className={`${isActive ? "dotActive" : "dotInactive"}${
          !isLast ? " mr8" : ""
        }`}
      />
    );
  }
  return <div className="rowCenter">{dots}</div>;
};

export default CarouselIndicator;
