const { 
  updateExerciseState,
  updateRoutineState,
  getApplicationState,
  getNextExerciseState,
  updateState,
} = require('./../applicationState/applicationState');
const routineStore = require('./../routineStore');

test('ensures application can update state', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'INIT', 
          data: null
        },
        routineState: {
          type: undefined, 
          data: {
            difficulty: undefined,
            activity: undefined
          }
        },
        exerciseState: {
          type: undefined,
          data: null
        }
      }
    ]
  };
  // mock function to update the internal store.
  const mockUpdateFn = jest.fn();
  var nextState = updateState(
    {
      state: mockState.stateArray[0], 
      stateName: 'ACTIVITY',
      update: mockUpdateFn
    }
  );
  expect(nextState).toEqual(
    {
      state: {
        type: 'ACTIVITY', 
        data: null
      },
      routineState: {
        type: undefined, 
        data: {
          difficulty: undefined,
          activity: undefined
        }
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }
  );
});  

test('ensures application can locate and return the initial routine exercise', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY'
        },
        routineState: {
          type: 'JOG_LIGHT',
          data: {
            difficulty: 'LIGHT',
            activity: 'JOG',
          }
        },
        exerciseState: {
          type: undefined,
          data: null
        }
      }
    ]
  };
  const mockUpdateFn = jest.fn();
  var nextExercise = getNextExerciseState({ 
    state: mockState.stateArray[0], 
    routineStore: routineStore,
    update: mockUpdateFn 
  });
  expect(nextExercise).toBe("INTRO_JOG_LIGHT");
});

test('ensures application can locate and return next routine exercise state from array of steps', () => { 
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY',
          data: null
        },
        routineState: {
          type: 'JOG_LIGHT', 
          data: {
            difficulty: 'LIGHT',
            activity: 'JOG', 
          }
        },
        exerciseState: {
          type: 'INTRO_JOG_LIGHT',
          data: null
        }
      }
    ]
  };
  const mockUpdateFn = jest.fn();
  var nextExercise = getNextExerciseState({
    state: mockState.stateArray[0], 
    routineStore: routineStore,
    update: mockUpdateFn 
  });
  expect(nextExercise).toBe("DOUBLE_HEAL_LIFTS_INIT");
});

test('ensures application can get the next state name and apply the new state to the application state with no mutation of other properties', () => {
  var mockState = {
    stateArray: [
      {
        state: {
          type: 'ACTIVITY',
          data: null
        },
        routineState: {
          type: 'JOG_LIGHT',
          data: {
            difficulty: 'LIGHT', 
            activity: 'JOG', 
          }
        },
        exerciseState: {
          type: undefined,
          data: null
        }
      }
    ]
  };
  const nextExercise = getNextExerciseState({
    state: mockState.stateArray[0], 
    routineStore: routineStore
  });
  const mockUpdateFn = jest.fn();
  const updatedState = updateExerciseState({
    state: mockState.stateArray[0], 
    exerciseStateName: nextExercise,
    update: mockUpdateFn 
  });
  expect(updatedState).toEqual(
    { 
      state: {  
        type: 'ACTIVITY',
        data: null,
      },
      routineState: {
        type: 'JOG_LIGHT',
        data: {
          difficulty: 'LIGHT',
          activity: 'JOG',
        }
      },
      exerciseState: {
        type: 'INTRO_JOG_LIGHT',
        data: null
      }
    }
  );
});

test('ensures application can get state', () => { 
  var appState = getApplicationState();
  expect(appState).toEqual(
    {
      state: {
        type: 'INIT', 
        data: null
      },
      routineState: {
        type: undefined, 
        data: {
          difficulty: undefined,
          activity: undefined
        }
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }
  );
});  

test('ensures application can update routine state', () => { 
  const mockUpdateFn = jest.fn();
  var appState = updateRoutineState({
    state: {
      state: {
        type: 'ACTIVITY', 
        data: null
      },
      routineState: {
        type: undefined, 
        data: {
          difficulty: undefined,
          activity: undefined
        }
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }, 
    data: { 
      activity: 'JOG', 
      difficulty: 'LIGHT' 
    },
    update: mockUpdateFn 
  });
  expect(appState).toEqual(
    { 
      state: {  
        type: 'ACTIVITY',
        data: null,
      },
      routineState: {
        type: 'JOG_LIGHT',
        data: {
          difficulty: 'LIGHT',
          activity: 'JOG',
        }
      },
      exerciseState: {
        type: undefined,
        data: null
      }
    }
  );
});  