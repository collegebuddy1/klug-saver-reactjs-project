import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ICategoryMap, IExpense, IThemeConstants } from '../../typings';
import { withTheme } from '../ThemeProvider/withTheme';
import Breakdown from './Components/Breakdown';
import { CategoryFilterHeader } from './Components/CategoryFilterHeader';
import { GrandTotal } from './Components/GrandTotal';
import { PeriodPicker } from './Components/PeriodPicker';
import { getFilteredExpenses, getPeriodLabel } from './helpers';

export type PeriodFilterType = 'year' | 'month' | 'week' | 'day';

interface IRootProps {
  expenses: IExpense[];
  categoryMap: ICategoryMap;
  theme: IThemeConstants;
}

interface IRootState {
  periodFilterType: PeriodFilterType;
  offset: number;
  filter?: string;
}

class Root extends React.Component<IRootProps, IRootState> {
  constructor(props: IRootProps) {
    super(props);
    this.state = {
      periodFilterType: 'month',
      offset: 0,
      filter: undefined
    };
  }

  public render() {
    const { theme } = this.props;
    const { periodFilterType, offset, filter } = this.state;
    const expenses = getFilteredExpenses(this.props.expenses, periodFilterType, offset, filter);

    return <View style={styles(theme).breakdownContainer}>
      <PeriodPicker
        currentFilterType={periodFilterType}
        onCurrentFilterChange={this.onCurrentFilterChange}
      />
      <GrandTotal
        expenses={expenses}
        label={getPeriodLabel(periodFilterType, offset)}
        isBeforeHidden={offset < -365}
        isNextHidden={offset >= 0}
        onBefore={this.onOffsetChange(-1)}
        onNext={this.onOffsetChange(1)}
      />
      <CategoryFilterHeader filter={filter} onReset={this.onResetFilter} />
      <Breakdown
        expenses={expenses}
        filter={filter}
        onFilterChange={this.onFilterChange}
      />
    </View>
  }

  private onFilterChange = (filter: string) => {
    if (this.state.filter) {
      return;
    }

    this.setState({ filter });
  }

  private onResetFilter = () => {
    this.setState({ filter: undefined });
  }

  private onOffsetChange = (amount: number) => () => {
    this.setState({ offset: this.state.offset + amount });
  }

  private onCurrentFilterChange = (periodFilterType: PeriodFilterType) => {
    this.setState({ periodFilterType, offset: 0 });
  }
}

export default withTheme(Root);

const styles = (theme: IThemeConstants) => StyleSheet.create({
  breakdownContainer: {
    flex: 1
  }
});
