import { useAppSelector } from '../../hooks';
import { selectServerAvaible } from '../../stores/system/system-selectors';

export function ServerUnavaibleMessage() {
  const serverAvaible = useAppSelector(selectServerAvaible);

  return (
    serverAvaible ? null :
      <div style={{
        zIndex: 100000,
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '200px',
        backgroundColor: 'yellow'
      }}
      >
        Problems with server connection, content may not be displayed correctly
      </div>
  );
}
