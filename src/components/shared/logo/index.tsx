const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <h3 className="font-extrabold text-2xl xl:text-3xl">
      Car<span className="text-green-500">E</span>Bids
    </h3>
  );
};

export default Logo;
