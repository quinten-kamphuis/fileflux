type Props = {
    children: React.ReactNode;
};

export const CardsSection = ({ children }: Props) => {
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    {children}
                </div>
            </div>
        </section>
    );
};
