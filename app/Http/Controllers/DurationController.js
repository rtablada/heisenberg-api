'use strict';

const Duration = use('App/Model/Duration');
const attributes = ['time'];

class DurationController {

  * index(request, response) {
    const durations = yield Duration.with('item').fetch();

    response.jsonApi('Duration', durations);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };
    const duration = yield Duration.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Duration', duration);
  }

  * show(request, response) {
    const id = request.param('id');
    const duration = yield Duration.with('item').where({ id }).firstOrFail();

    response.jsonApi('Duration', duration);
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
    };

    const duration = yield Duration.with().where({ id }).firstOrFail();
    duration.fill(Object.assign({}, input, foreignKeys));
    yield duration.save();

    response.jsonApi('Duration', duration);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const duration = yield Duration.query().where({ id }).firstOrFail();
    yield duration.delete();

    response.status(204).send();
  }

}

module.exports = DurationController;
