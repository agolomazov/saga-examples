import { eventChannel, END } from "redux-saga";
import { call, take } from "redux-saga/effects";
import { createEventProvider } from "../../api/event-provider";


function createEventProviderChannel(provider) {
  return eventChannel((emit) => {
    const valueHandler = (event) => {
      if (event.payload === 10) {
        emit(END);
        return;
      } else {
        emit(event.payload);
      }
    };

    provider.subscribe('value', valueHandler);

    return () => {
      provider.unsubscribe('value', valueHandler);
      console.log('unsubscribe event');
    }
  });
}

export function* sagaEventChannel() {
  const eventProvider = yield call(createEventProvider);

  const eventProviderChannel = yield call(createEventProviderChannel, eventProvider);

  try {
    while(true) {
      const payload = yield take(eventProviderChannel);
      console.log(payload);
    }
  } catch (error) {
    console.log(error);  
  } finally {
    console.log('end event channel');
  }
}