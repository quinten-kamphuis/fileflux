import { FileSystemCard } from './file-system-card';

type Props = {
    link: string;
};

export const UpCard = ({ link }: Props) => {
    return (
        <FileSystemCard
            variant="up"
            title=".."
            description="Go back up one level"
            link={link}
        >
            <div>
                <p>Go back up one level.</p>
            </div>
        </FileSystemCard>
    );
};
