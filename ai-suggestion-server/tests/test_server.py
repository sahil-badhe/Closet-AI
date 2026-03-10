import pytest
from server import get_age_group

def test_get_age_group_child():
    assert get_age_group(10, "Male") == "child male"

def test_get_age_group_teen():
    assert get_age_group(15, "Female") == "teenage female"

def test_get_age_group_young_adult():
    assert get_age_group(25, "Male") == "young adult male"

def test_get_age_group_middle_aged():
    assert get_age_group(45, "Female") == "middle-aged female"

def test_get_age_group_elderly():
    assert get_age_group(65, "Male") == "elderly male"

def test_get_age_group_very_old():
    assert get_age_group(80, "Female") == "very old female"
