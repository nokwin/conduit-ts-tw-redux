import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

enum TagListStyle {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

interface TagListProps {
  list: string[];
  itemStyle?: keyof typeof TagListStyle;
  itemAs?: 'li' | 'a';
}

export const TagList: FC<TagListProps> = ({
  list,
  itemStyle = TagListStyle.LIGHT,
  itemAs = 'li',
}) => {
  const itemClasses = clsx(
    'font-light text-date border mr-1 mb-0.2 px-tag rounded-tag',
    {
      'border-conduit-gray-300 text-conduit-gray-600':
        itemStyle === TagListStyle.LIGHT,
      'bg-conduit-gray-800 text-white border-conduit-gray-800 hover:bg-conduit-gray-900':
        itemStyle === TagListStyle.DARK,
      'hover:text-white hover:no-underline':
        itemStyle === TagListStyle.DARK && itemAs === 'a',
    }
  );

  return (
    <ul className="flex flex-wrap">
      {list.map((tag) => {
        return itemAs === 'li' ? (
          <li className={itemClasses} key={tag}>
            {tag}
          </li>
        ) : (
          <Link to={`/?tag=${tag}`} className={itemClasses} key={tag}>
            {tag}
          </Link>
        );
      })}
    </ul>
  );
};
