type Props = {
    children: React.ReactNode;
};

export const CardsSection = ({ children }: Props) => {
    return (
        <section>
            <div className="container grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                {children}
            </div>
        </section>
    );
};
