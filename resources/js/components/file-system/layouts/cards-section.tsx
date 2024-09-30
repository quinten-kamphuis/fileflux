import { FileSystemItem } from '@/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardsGrid } from '../cards/cards-grid';
import { FileCard } from '../cards/file-card';
import { FolderCard } from '../cards/folder-card';
import { UpCard } from '../cards/up-card';
import { InfiniteEnd, InfiniteLoader } from '../infinite-scroll-helpers';

type Props = {
    items: FileSystemItem[];
    loadMore: () => void;
    hasMore: boolean;
    upLink: string;
};

export const CardsSection = ({ items, loadMore, hasMore, upLink }: Props) => {
    return (
        <section>
            <InfiniteScroll
                dataLength={items.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<InfiniteLoader />}
                endMessage={<InfiniteEnd />}
            >
                <CardsGrid>
                    <UpCard link={upLink} />
                    {items.map((item) => {
                        return item.type === 'folder' ? (
                            <FolderCard key={item.id} item={item} />
                        ) : (
                            <FileCard key={item.id} item={item} />
                        );
                    })}
                </CardsGrid>
            </InfiniteScroll>
        </section>
    );
};
