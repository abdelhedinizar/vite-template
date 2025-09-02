import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { setTable } from '@/stores/slices/TableSlice';
import { paths } from '@/paths';

export function Page() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const tableId = params.get('tableId') || params.get('t') || params.get('table');
    const tableName = params.get('tableName') || params.get('name');
    if (tableId || tableName) {
      dispatch(setTable({ id: tableId, name: tableName || tableId }));
    }
    // After storing table, go to the menu/home or basket
    navigate(paths.dashboard.home, { replace: true });
  }, [params, dispatch, navigate]);

  return (
    <>
      <Helmet>
        <title>Opening table…</title>
      </Helmet>
      <div style={{ padding: 24 }}>Initialisation…</div>
    </>
  );
}
