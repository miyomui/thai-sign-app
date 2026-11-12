import { useVocabList } from '@/features/vocab';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedWordCard } from './components/FeaturedWordCard';
import { Greeting } from './components/Greeting';
import { SavedWords } from './components/SavedWords';
import { FEATURED_CATEGORY_ID } from './mock/featured';

/** หน้าแรก / */
export default function HomePage() {
  const { words } = useVocabList();
  const featured = words.filter((w) => w.categoryId === FEATURED_CATEGORY_ID);

  return (
    <div className="flex flex-col gap-8">
      <Greeting totalWords={words.length} />
      <FeaturedWordCard words={featured} />
      <CategoryGrid words={words} />
      <SavedWords words={words} />
    </div>
  );
}
