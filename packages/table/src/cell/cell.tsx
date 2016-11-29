/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */

import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";

import { Classes, IIntentProps, IProps } from "@blueprintjs/core";

export interface ICellProps extends IIntentProps, IProps {
    key?: string;

    /**
     * Show an animated loading shimmer of random length
     * @default false
     */
    isLoading?: boolean;

    style?: React.CSSProperties;

    /**
     * An optional native tooltip that is displayed on hover
     */
    tooltip?: string;
}

export type ICellRenderer = (rowIndex: number, columnIndex: number) => React.ReactElement<ICellProps>;

export const emptyCellRenderer = (_rowIndex: number, _columnIndex: number) => <Cell />;

@PureRender
export class Cell extends React.Component<ICellProps, {}> {
    public render() {
        const { style, isLoading, tooltip, className } = this.props;
        const content = isLoading
            ? this.renderSkeleton()
            : (<div className="bp-table-truncated-text">{this.props.children}</div>);
        const classes = classNames(
            "bp-table-cell",
            {
                "bp-table-cell-loading": isLoading,
            },
            Classes.intentClass(this.props.intent),
            className
        );
        return (<div className={classes} style={style} title={tooltip}>{content}</div>);
    }

    private renderSkeleton() {
        const width = Math.floor(Math.random() * 4) * 5;
        return (
            <div className={`bp-table-cell-skeleton bp-table-cell-skeleton-${width}`} />
        );
    }
}
