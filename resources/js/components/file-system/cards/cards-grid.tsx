type Props = {
    children: React.ReactNode;
};

export const CardsGrid = ({ children }: Props) => {
    return (
        <div className="container grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
            {children}
        </div>
    );
};
