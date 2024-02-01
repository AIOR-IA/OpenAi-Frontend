import { ProsConsResponse } from '@interfaces/pros-const.response';
import { environment } from 'environments/environment';


export const consProsUseCase = async ( prompt:string ) => {

  try {

    const resp = await fetch(`${ environment.backendApi }/pros-cons-discusser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if ( !resp.ok ) throw new Error('Correction could not be performed');

    const data = await resp.json() as ProsConsResponse;

    return {
      ok: true,
      ...data,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role:'',
      content:'Correction could not be performed',
    }
  }


}
