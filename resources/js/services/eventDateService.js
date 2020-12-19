import apiservice from './service';

async function destroy(id)
{
	return await apiservice.delete(`/event-dates/${id}`);
}

export {destroy};
