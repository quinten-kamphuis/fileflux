import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toSentenceCase } from '@/lib/utils';

type Props = {
    items: string[];
    placeholder: string;
    className?: string;
};

export const SelectWrapper = ({ items, placeholder, className }: Props) => {
    return (
        <Select>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item} value={item}>
                        {toSentenceCase(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
