import { useAppSelector } from '../../../hooks';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import { getComments, getLoadedDataCommentsStatus } from '../../../store/data-loading/selector';
import ReviewCol from '../review-col/review-col';

function ReviewTab(): JSX.Element | null {
  const comments = useAppSelector(getComments);
  const isDataLoaded = useAppSelector(getLoadedDataCommentsStatus);

  if (!comments) { return null; }
  const evenComments = comments.filter((comment, index) => index % 2 === 0);
  const oddComments = comments.filter((comment, index) => index % 2 !== 0);

  if (!isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <ReviewCol comments={evenComments} />
      <ReviewCol comments={oddComments} />
    </div>
  );
}

export default ReviewTab;
