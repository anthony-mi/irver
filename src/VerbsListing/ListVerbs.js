import React, { useContext, Fragment } from 'react';
import { GameContext, defaultCountOfWords, defaultTimeBeforeTilesHidingInSeconds, defaultUseOnlyUnlearnedWords} from '../GameContext';
import verbs from '../verbs.js';

export const RouteName = "/verbs-list";

const ListVerbs = () => {
    const [context, _] = useContext(GameContext);

    var selectedVerbs = [];

    if(context.useOnlyUnlearnedWords) {
        selectedVerbs = 
          verbs
            .filter((v) => context.learnedWords.indexOf(v) < 0)
            .sort(() => Math.random() - Math.random())
            .slice(0, context.countOfWords);
        
        // Count of used verbs greater than requested count of words.
        if(selectedVerbs.length < context.countOfWords) {
          const shortage = context.countOfWords  - selectedVerbs.length ;

          let randomLearnedWords =
            verbs
              .filter((v) => selectedVerbs.indexOf(v) < 0)
              .sort(() => Math.random() - Math.random())
              .slice(0, shortage);

            selectedVerbs = selectedVerbs.concat(randomLearnedWords);
        }
      }
      else {
        selectedVerbs = 
          verbs
            .sort(() => Math.random() - Math.random())
            .slice(0, context.countOfWords);
      }

    const maxWidthInPx = 640;

    return (
      <Fragment>
        <div className="card mt-5 p-3" style={{maxWidth: maxWidthInPx +'px'}}>
          <div className="table-responsive">
            <table className="table align-items-center mb-0">
              <thead>
                  <tr>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Base</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Past Simple</th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Past Participle</th>
                  </tr>
              </thead>
              <tbody>
                {selectedVerbs.map((v) =>
                  <tr>
                    <td className="align-middle text-center">
                      <h6 className="mb-0 text-xs">{v.Base}</h6>
                    </td>
                    <td className="align-middle text-center">
                      <h6 className="mb-0 text-xs">{v.PastSimple}</h6>
                    </td>
                    <td className="align-middle text-center">
                      <h6 className="mb-0 text-xs">{v.PastParticiple}</h6>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <button className="btn btn-success mt-3" style={{maxWidth: maxWidthInPx +'px'}} type="button">Start game</button>
      </Fragment>
    )
}

export default ListVerbs
