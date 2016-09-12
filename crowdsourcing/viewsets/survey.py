from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import list_route, detail_route
from crowdsourcing.data import results
from crowdsourcing.models import Trumpify, Survey
from crowdsourcing.serializers.dynamic import DynamicFieldsModelSerializer


class TrumpifySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Trumpify
        fields = ('id', 'task_id', 'result', 'tweet', 'worker_id')


class SurveyViewSet(viewsets.GenericViewSet):
    queryset = Survey.objects.all()
    serializer_class = TrumpifySerializer

    @list_route(methods=['post'])
    def load_all(self, request):
        trumpify_objects = []
        Trumpify.objects.all().delete()
        for r in results:
            trumpify_objects.append(Trumpify(id=r['task_worker_id'], task_id=r['task_id'],
                                             task_created_at=r['created_at'],
                                             task_worker_created_at=r['tw_created_at'],
                                             worker_id=r['worker_id'], tweet=r['tweet'], result=r['result']))
        Trumpify.objects.bulk_create(trumpify_objects)
        return Response({}, status=status.HTTP_201_CREATED)

    def get_results(self):
        import numpy as np
        first_answer = np.random.choice(np.arange(0, 80, 1))
        second_answer = np.random.choice(np.arange(81, 221, 1))
        return results[first_answer], results[second_answer]

    def list(self, request):
        result_one, result_two = self.get_results()
        while result_one['worker_id'] == result_two['worker_id']:
            result_one, result_two = self.get_results()
        survey = Survey.objects.create(answer_one_id=result_one['task_worker_id'],
                                       answer_two_id=result_two['task_worker_id'])
        return Response({"responses": {"result_one": result_one, "result_two": result_two}, 'id': survey.id},
                        status=status.HTTP_200_OK)

    @detail_route(methods=['post'])
    def submit_result(self, request, *args, **kwargs):
        answer_picked = request.data.get('answer', None)
        tweet_picked = request.data.get('tweet', None)
        if answer_picked is None or tweet_picked is None:
            Response(data={"message": "Please answer both questions"}, status=status.HTTP_400_BAD_REQUEST)

        survey = self.get_object()
        survey.answer_picked_id = answer_picked
        survey.tweet_picked_id = tweet_picked
        survey.save()
        return Response({}, status=status.HTTP_201_CREATED)
