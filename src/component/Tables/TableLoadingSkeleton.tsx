import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TableRowSkeletonProps {
    numberOfCol?: number;
    numberOfRow?: number;
    height?: number;
}

const TableLoadingSkeleton = ({ numberOfRow = 10, numberOfCol = 5, height = 60 }: TableRowSkeletonProps) => {
    const rows: string[] = []
    for (let index = 0; index < numberOfRow; index++) {
        rows.push(uuidv4())
    }
    const cols: string[] = []
    for (let index = 0; index < numberOfCol; index++) {
        cols.push(uuidv4())
    }

    return (
        <TableBody>
            {rows.map((eachRow) => (
                <TableRow key={eachRow}>
                    {cols.map((eachCol) => (
                        <TableCell key={eachCol}>
                            <Skeleton animation='wave' sx={{ bgcolor: '#F5F5F5' }} height={height} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>

    )
}

export default TableLoadingSkeleton
