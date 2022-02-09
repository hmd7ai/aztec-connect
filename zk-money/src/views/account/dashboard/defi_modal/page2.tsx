import { useState } from 'react';
import styled from 'styled-components/macro';
import { DefiComposerPhase, DefiComposerState } from '../../../../alt-model/defi/defi_composer';
import { Asset, toBaseUnits } from '../../../../app';
import { Theme, themeColours } from '../../../../styles';
import { BorderBox, Button, Text } from '../../../../components';
import { Breakdown } from './breakdown';
import { DefiSubmissionSteps } from './defi_submission_steps';
import { Disclaimer } from './disclaimer';
import { TransactionComplete } from './transaction_complete';
import { DefiFormFields } from './types';
import { DefiRecipe } from 'alt-model/defi/types';
import { BridgeCountDown } from 'features/defi/bridge_count_down';
import { BridgeKeyStats } from 'features/defi/bridge_key_stats';

const Root = styled.div`
  display: grid;
  gap: 50px;
`;

const S_TopStats = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 5fr;
  gap: 10%;
  padding: 20px 25px;
`;

const S_Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${themeColours[Theme.WHITE].border};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Page2Props {
  recipe: DefiRecipe;
  composerState: DefiComposerState;
  asset: Asset;
  fields: DefiFormFields;
  fee: bigint | undefined;
  maxAmount: bigint;
  onSubmit: () => void;
}

export function Page2({ recipe, composerState, asset, maxAmount, fields, fee, onSubmit }: Page2Props) {
  const amount = toBaseUnits(fields.amountStr, asset.decimals);
  const [riskChecked, setRiskChecked] = useState(false);
  const hasError = composerState.erroredPhase !== undefined;
  const isIdle = composerState.phase === DefiComposerPhase.IDLE;
  const showingDeclaration = isIdle && !hasError;
  const showingComplete = composerState.phase === DefiComposerPhase.DONE;
  const canSubmit = riskChecked && isIdle;
  return (
    <Root>
      <BorderBox>
        <S_TopStats>
          <Text size="xxs" italic text={recipe.shortDesc} />
          <BridgeCountDown
            nextBatch={new Date(Date.now() + 1000 * 60 * 60)}
            takenSlots={10}
            totalSlots={12}
            compact={true}
          />
          <BridgeKeyStats compact />
        </S_TopStats>
        <S_Separator />
        <Breakdown amount={amount} fee={fee ?? 0n} asset={asset} />
      </BorderBox>
      <BorderBox>
        {showingDeclaration ? (
          <Disclaimer accepted={riskChecked} onChangeAccepted={setRiskChecked} asset={asset} maxAmount={maxAmount} />
        ) : showingComplete ? (
          <TransactionComplete />
        ) : (
          <DefiSubmissionSteps composerState={composerState} />
        )}
      </BorderBox>
      <Footer>
        <Button
          text={hasError ? 'Retry' : 'Confirm Submit'}
          onClick={riskChecked ? onSubmit : undefined}
          disabled={!canSubmit}
        />
      </Footer>
    </Root>
  );
}
