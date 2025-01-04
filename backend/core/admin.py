from django.contrib import admin

# Register your models here.
from .models import (
    PackageComment,
    TraverseItem,
    User,
    Label,
    Travellers,
    Business,
    Guide,
    Package,
    PackageSubscription,
    Event,
    EventInterested,
    Post,
    PostComment
)

from django.utils import timezone

from core.machineLearning.model_cache import ModelCache
from core.machineLearning.tokenizer_cache import TokenizerCache

model = ModelCache.get_model()
tokenizer = TokenizerCache.get_tokenizer()



# Custom User admin (if needed for additional display configuration)
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name", "last_name", "is_staff")
    search_fields = ("username", "email")

# Register Label
@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


# Register Travellers
@admin.register(Travellers)
class TravellersAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user")
    search_fields = ("base_user__username",)
    filter_horizontal = ("interests",)


# Register Guide
@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user__username", "base_user__email")
    search_fields = ("base_user__username", "base_user__email")
    filter_horizontal = ("label",)

# Register Business
@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ("id", "base_user__username", "base_user__email")
    search_fields = ("base_user__username", "base_user__email")
    
# Register Event
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    search_fields = ("name",)
    filter_horizontal = ("label",)


# Register EventLike
@admin.register(EventInterested)
class EventLikeAdmin(admin.ModelAdmin):
    list_display = ("id", "event", "interested_user")
    search_fields = ("event__name", "interested_user__username")

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "description")
    search_fields = ("description",)
    filter_horizontal = ("label",)

@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display=("id","comment","commented_by__username")


from tf_keras.preprocessing.sequence import pad_sequences
from django.utils.safestring import mark_safe
import numpy as np
@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price")
    search_fields = ("name",)
    filter_horizontal = ("label",)
    readonly_fields = ["reviews_chart"]

    def reviews_chart(self, obj):
        comments = PackageComment.objects.filter(package__id=obj.id).values_list("comment", flat=True)
        if not comments:
            return "No reviews available."

        try:


            # Prepare data
            sequences = tokenizer.texts_to_sequences(comments)
            test_review = pad_sequences(sequences, maxlen=600)

            # Predict sentiments
            predictions = model.predict(test_review)
            sentiments = ["Negative", "Neutral", "Positive"]
            sentiment_labels = [sentiments[np.argmax(pred)] for pred in predictions]

            # Calculate percentages
            positive_count = sentiment_labels.count("Positive")
            negative_count = sentiment_labels.count("Negative")
            neutral_count = sentiment_labels.count("Neutral")
            total = len(sentiment_labels)

            data = {
                "Positive": round((positive_count / total) * 100, 2),
                "Negative": round((negative_count / total) * 100, 2),
                "Neutral": round((neutral_count / total) * 100, 2),
            }

            # Create the chart
            chart_html = f"""
                <canvas id="sentimentChart" width="400" height="400"></canvas>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script>
                    const ctx = document.getElementById('sentimentChart').getContext('2d');
                    new Chart(ctx, {{
                        type: 'pie',
                        data: {{
                            labels: ['Positive', 'Negative', 'Neutral'],
                            datasets: [{{
                                label: 'Sentiment Analysis',
                                data: [{data['Positive']}, {data['Negative']}, {data['Neutral']}],
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(255, 206, 86, 0.6)'
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 206, 86, 1)'
                                ],
                                borderWidth: 1
                            }}]
                        }},
                        options: {{
                            responsive: true,
                            plugins: {{
                                legend: {{
                                    position: 'top',
                                }},
                                tooltip: {{
                                    callbacks: {{
                                        label: function(context) {{
                                            return context.label + ': ' + context.raw + '%';
                                        }}
                                    }}
                                }}
                            }}
                        }}
                    }});
                </script>
            """
            return mark_safe(chart_html)

        except Exception as e:
            return f"Error generating chart: {e}"

@admin.register(PackageComment)
class PackageCommentAdmin(admin.ModelAdmin):
    list_display=("id","comment","commented_by__username")

@admin.register(PackageSubscription)
class PackageSubscriptionAdmin(admin.ModelAdmin):
    list_display=("package","subscribed_by")
    
    
@admin.register(TraverseItem)
class TraverseItemAdmin(admin.ModelAdmin):
    pass